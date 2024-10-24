
import './Home.css';
function Home() {
    return ( 
        <div className='home-container'>
            
            <div className="img-container">
                <img src="./img/gifmairee.jpg" 
                className="img-fluid" alt="" />
            </div>
            <div className="text-container">
                <h3>ชื่อ : นายกิ๊ฟมัยรี หนุมาน</h3>
                <h3>รหัสนักศึกษา : 66037423</h3>
                <h3>คณะ : เทคโนโลยีสารสนเทศ</h3>
                <h3>สาขา : วิทยาการคอมพิวเตอร์</h3>
            </div>
        </div>
     );
}

export default Home;