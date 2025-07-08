import Counter from '../components/Counter'
import UserProfile from '../components/UserProfile'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Zustand Examples
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Counter />
          <UserProfile />
        </div>
      </div>
    </main>
  )
}
