import './App.css'
import MainProduct from './product-list/MainProduct'
import List from './product-list/List'
import ListFunction from './product-list/ListFunction'

function App() {

  return (
    <div className='w-screen h-screen'>
      <MainProduct>
        <div className="h-[5%]">
          <ListFunction />
        </div>
        <div className="h-[95%]">
          <List />
        </div>
      </MainProduct>
    </div>
  )
}

export default App
