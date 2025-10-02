import React from 'react'
import { useThemeConfig } from '../hooks/useThemeConfig'
import { useAchievements } from '../contexts/AchievementContext'
import { useSequenceState } from '../hooks/useSequenceState'
import AssociationComponent from '../components/AssociationComponent'
import MigrationComponent from '../components/MigrationComponent'
import BucketComponent from '../components/BucketComponent'
import ProgressBar from '../components/ProgressBar'

const SequencePage = () => {
  const { theme, getTextColor, getTextSecondaryColor, getCardClasses, getButtonClasses } = useThemeConfig()
  const { checkActivityCompletion, checkSequenceCompletion } = useAchievements()

  const activities = theme.content.sequence.activities

  const {
    currentActivityIndex,
    scores,
    totalScore,
    isCompleted,
    showActivity,
    currentActivity,
    handleActivityComplete: originalHandleActivityComplete,
    handleRestartSequence,
    getScoreMessage,
  } = useSequenceState(activities, theme)

  // Enhanced activity completion handler that includes achievement checks
  const handleActivityComplete = (score) => {
    // Check for activity achievements
    const isFirstAttempt = !scores[currentActivity.id]
    checkActivityCompletion(currentActivity.id, score, currentActivity.maxScore, isFirstAttempt)

    // Call the original handler
    originalHandleActivityComplete(score)

    // Check for sequence completion achievements
    if (currentActivityIndex === activities.length - 1) {
      // This is the last activity, check sequence achievements
      const finalScore = Object.values({ ...scores, [currentActivity.id]: score }).reduce((sum, s) => sum + (s || 0), 0)
      const hasCompletedBefore = localStorage.getItem('sequenceCompletedBefore')
      const isRetry = !!hasCompletedBefore

      checkSequenceCompletion(finalScore, theme.content.sequence.conclusion.totalMaxScore, isRetry)

      // Mark that sequence has been completed at least once
      localStorage.setItem('sequenceCompletedBefore', 'true')
    }
  }

  // Afficher l'activité en cours
  if (showActivity) {
    if (currentActivity.id === 'association') {
      return (
        <AssociationComponent
          onComplete={handleActivityComplete}
          currentIndex={currentActivityIndex}
          totalItems={activities.length}
          totalScore={totalScore}
          maxScore={theme.content.sequence.conclusion.totalMaxScore}
        />
      )
    } else if (currentActivity.id === 'migration') {
      return (
        <MigrationComponent
          onComplete={handleActivityComplete}
          currentIndex={currentActivityIndex}
          totalItems={activities.length}
          totalScore={totalScore}
          maxScore={theme.content.sequence.conclusion.totalMaxScore}
        />
      )
    } else if (currentActivity.id === 'bucket') {
      return (
        <BucketComponent
          onComplete={handleActivityComplete}
          currentIndex={currentActivityIndex}
          totalItems={activities.length}
          totalScore={totalScore}
          maxScore={theme.content.sequence.conclusion.totalMaxScore}
        />
      )
    }
  }

  if (isCompleted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 text-${getTextColor()} font-molle`}>
            {theme.content.sequence.conclusion.title}
          </h1>
          <p className={`text-xl mb-8 text-${getTextSecondaryColor()}`}>
            {theme.content.sequence.conclusion.subtitle}
          </p>

          {/* Score Total */}
          <div className={`${getCardClasses()} mb-8`}>
            <h2 className={`text-2xl font-bold mb-4 text-${getTextColor()}`}>
              Score Final
            </h2>
            <div className="text-4xl font-bold mb-4">
              {totalScore}/{theme.content.sequence.conclusion.totalMaxScore}
            </div>
            <div className="text-lg mb-4">
              {Math.round((totalScore / theme.content.sequence.conclusion.totalMaxScore) * 100)}%
            </div>
            <p className={`text-lg text-${getTextSecondaryColor()}`}>
              {getScoreMessage()}
            </p>
          </div>

          {/* Détail des Scores */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {activities.map((activity) => (
              <div key={activity.id} className={`${getCardClasses()}`}>
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{activity.icon}</span>
                  <div>
                    <h3 className={`text-lg font-semibold text-${getTextColor()}`}>
                      {activity.title}
                    </h3>
                    <p className={`text-sm text-${getTextSecondaryColor()}`}>
                      {activity.description}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {scores[activity.id] || 0}/{activity.maxScore}
                  </div>
                  <div className="text-sm">
                    {Math.round(((scores[activity.id] || 0) / activity.maxScore) * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="text-center">
            <button
              onClick={handleRestartSequence}
              className={`${getButtonClasses()}`}
            >
              Recommencer la Séquence
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold mb-6 text-${getTextColor()} font-molle`}>
          {theme.content.sequence.title}
        </h1>
        <p className={`text-xl mb-8 text-${getTextSecondaryColor()}`}>
          {theme.content.sequence.subtitle}
        </p>
      </div>

      {/* Progression */}
      <ProgressBar
        currentIndex={currentActivityIndex}
        totalItems={activities.length}
        currentActivity={currentActivity}
        totalScore={totalScore}
        maxScore={theme.content.sequence.conclusion.totalMaxScore}
      />


    </div>
  )
}

export default SequencePage
