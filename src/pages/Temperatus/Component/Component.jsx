
import './Component.css';
import Counter from '../Counter/Counter';
import Add from '../Add/Add';
import Timer from '../Timer/Timer';
import Temperatures from '../Temperatures/Temperatures';

function Component() {
  

    return (
      <div className="Component-container">
        <h1 className='App-title'>REACT COMPONENTS</h1>
        <div className='Counter-container'>
          <div className='Counter-1'>
            <Counter />
            <Timer />
          </div>
          <div className='Counter-2'><Add /></div>
          <div className='Counter-3'><Temperatures /></div>
          
        </div>
        <div><h2 className='Component-title'>66037423 นาย กิ๊ฟมัยรี หนุมาน</h2></div>
      </div>
        
     
    )
  }
  
  export default Component