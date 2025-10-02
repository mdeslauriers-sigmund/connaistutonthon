const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Bienvenue dans l'univers du Thon! 🐟
        </h1>
        <p className="text-xl md:text-2xl text-wave-light mb-8 max-w-3xl mx-auto">
          Découvrez les mystères des océans et testez vos connaissances sur l'un des poissons les plus fascinants de la planète.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="text-4xl mb-4">🌊</div>
            <h3 className="text-xl font-semibold text-white mb-2">Exploration</h3>
            <p className="text-wave-light">
              Plongez dans les profondeurs océaniques et découvrez l'habitat naturel du thon.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold text-white mb-2">Apprentissage</h3>
            <p className="text-wave-light">
              Testez vos connaissances avec nos quiz interactifs sur la biologie marine.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-2">Défis</h3>
            <p className="text-wave-light">
              Relevez des défis amusants et devenez un expert en ichtyologie.
            </p>
          </div>
        </div>
        
        <div className="mt-12">
          <button className="bg-tuna-light hover:bg-tuna-blue text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
            Commencer l'aventure
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
