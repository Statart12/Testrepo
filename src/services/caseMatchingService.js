import { getCasesForLawyer, getAllLawyers, getLawyersBySpecialization } from './authService';

/**
 * Match a case with the best available lawyer
 * @param {object} caseData - Case data including caseType and clientId
 * @returns {Promise<object>} Matched lawyer object or null if no match found
 */
export const matchCaseWithLawyer = async (caseData) => {
  try {
    const { caseType } = caseData;

    // Get lawyers with matching specialization
    let availableLawyers = await getLawyersBySpecialization(caseType);

    if (availableLawyers.length === 0) {
      console.warn('No lawyers found with specified specialization');
      // Fall back to getting all lawyers if no specialization match
      availableLawyers = await getAllLawyers();
    }

    if (availableLawyers.length === 0) {
      console.warn('No lawyers available');
      return null;
    }

    // Get active case counts for each lawyer and calculate suitability score
    let lawyerScores = [];

    for (const lawyer of availableLawyers) {
      try {
        const lawyerCases = await getCasesForLawyer(lawyer.uid);
        const activeCasesCount = lawyerCases.filter(
          (c) => c.status === 'active' || c.status === 'pending'
        ).length;

        // Calculate suitability score
        // Lower caseload = higher score
        // Matching specialization = bonus points
        let score = 100 - activeCasesCount * 10; // Base score from caseload

        // Bonus for experience
        if (lawyer.yearsOfExperience) {
          score += Math.min(lawyer.yearsOfExperience * 2, 20);
        }

        // Bonus for specialization match
        if (
          lawyer.specializations &&
          lawyer.specializations.includes(caseType)
        ) {
          score += 30;
        }

        lawyerScores.push({
          ...lawyer,
          activeCasesCount,
          score,
        });
      } catch (error) {
        console.error(`Error calculating score for lawyer ${lawyer.uid}:`, error);
        // Still add lawyer with base score if case retrieval fails
        lawyerScores.push({
          ...lawyer,
          activeCasesCount: 0,
          score: 50,
        });
      }
    }

    // Sort by score (highest first) and return the best match
    lawyerScores.sort((a, b) => b.score - a.score);

    if (lawyerScores.length > 0) {
      const { score, activeCasesCount, ...bestLawyer } = lawyerScores[0];
      return bestLawyer;
    }

    return null;
  } catch (error) {
    console.error('Case matching error:', error);
    throw new Error(error.message);
  }
};

/**
 * Get lawyer availability status
 * @param {string} lawyerId - Lawyer ID
 * @returns {Promise<object>} Availability data
 */
export const getLawyerAvailability = async (lawyerId) => {
  try {
    const lawyerCases = await getCasesForLawyer(lawyerId);
    const activeCases = lawyerCases.filter(
      (c) => c.status === 'active' || c.status === 'pending'
    );
    const clearedCases = lawyerCases.filter((c) => c.status === 'cleared');
    const wonCases = clearedCases.filter((c) => c.outcome === 'won');
    const lostCases = clearedCases.filter((c) => c.outcome === 'lost');

    return {
      totalCases: lawyerCases.length,
      activeCases: activeCases.length,
      clearedCases: clearedCases.length,
      wonCases: wonCases.length,
      lostCases: lostCases.length,
      winRate: clearedCases.length > 0
        ? ((wonCases.length / clearedCases.length) * 100).toFixed(2)
        : 0,
    };
  } catch (error) {
    console.error('Get lawyer availability error:', error);
    throw new Error(error.message);
  }
};

/**
 * Find alternative lawyers for a case
 * @param {object} caseData - Case data
 * @param {number} topN - Number of alternatives to return
 * @returns {Promise<array>} Array of alternative lawyer objects
 */
export const findAlternativeLawyers = async (caseData, topN = 3) => {
  try {
    const { caseType } = caseData;

    // Get lawyers with matching specialization
    let availableLawyers = await getLawyersBySpecialization(caseType);

    if (availableLawyers.length === 0) {
      availableLawyers = await getAllLawyers();
    }

    // Get active case counts and calculate scores
    let lawyerScores = [];

    for (const lawyer of availableLawyers) {
      try {
        const lawyerCases = await getCasesForLawyer(lawyer.uid);
        const activeCasesCount = lawyerCases.filter(
          (c) => c.status === 'active' || c.status === 'pending'
        ).length;

        let score = 100 - activeCasesCount * 10;

        if (lawyer.yearsOfExperience) {
          score += Math.min(lawyer.yearsOfExperience * 2, 20);
        }

        if (
          lawyer.specializations &&
          lawyer.specializations.includes(caseType)
        ) {
          score += 30;
        }

        lawyerScores.push({
          ...lawyer,
          activeCasesCount,
          score,
        });
      } catch (error) {
        console.error(`Error calculating score for lawyer ${lawyer.uid}:`, error);
        lawyerScores.push({
          ...lawyer,
          activeCasesCount: 0,
          score: 50,
        });
      }
    }

    // Sort by score and return top N
    lawyerScores.sort((a, b) => b.score - a.score);
    return lawyerScores.slice(0, topN).map(({ score, activeCasesCount, ...lawyer }) => lawyer);
  } catch (error) {
    console.error('Find alternative lawyers error:', error);
    throw new Error(error.message);
  }
};
