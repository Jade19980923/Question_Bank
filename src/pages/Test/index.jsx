import { Link } from 'react-router-dom';
import './index.css';

function Home() {
  return (
    <div className="main-container">
      <div className="top-section">
        <div className="box">Box 1</div>
        <div className="box">Box 2</div>
        <div className="box">Box 3</div>
      </div>
      <div className="middle-section">
        <div className="image-container">
          <img src="path_to_your_image.jpg" alt="Image" />
        </div>
        <div className="bordered-box">Bordered Box</div>
      </div>
      <div className="bottom-section">
        <div className="bordered-box">Bordered Box</div>
        <div className="image-container">
          <img src="path_to_your_image.jpg" alt="Image" />
        </div>
      </div>
    </div>
  );
}

export default Home;
