import { Link } from 'react-router-dom'

const ActivityPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Activités 🎯
        </h1>
        <p className="text-xl text-wave-light mb-8 max-w-3xl mx-auto">
          Découvrez nos activités interactives pour apprendre tout sur le thon!
        </p>
        
        <div className="flex justify-center mt-12">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20 max-w-md">
            <div className="text-5xl mb-4 text-center">📚</div>
            <h3 className="text-2xl font-semibold text-white mb-4 text-center">Séquence Complète</h3>
            <p className="text-wave-light mb-6 text-center">
              Parcourez toutes les activités dans l'ordre et cumulez votre score !
            </p>
            <div className="text-center">
              <Link 
                to="/sequence"
                className="inline-block bg-tuna-light hover:bg-tuna-blue text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Commencer la Séquence
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <Link 
            to="/" 
            className="inline-block bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200 border border-white/20"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ActivityPage
  