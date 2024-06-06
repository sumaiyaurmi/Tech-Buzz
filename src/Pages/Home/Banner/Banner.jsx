import { Typewriter } from 'react-simple-typewriter';
import './banner.css'

const Banner = () => {
    return (
        <div className='banner mb-4'>
            <div className='absolute top-36 p-7  space-y-6'>
            <h1 className="text-2xl md:text-4xl  font-semibold text-white">
              Tech<span className="text-yellow-600 font-serif  font-bold">B</span>uzz
              <span className="text-yellow-600 ml-6 font-bold">
                {/* Style will be inherited from the parent element */}
                <Typewriter
                  words={[
                    "Explore the Future of Tech",
                    "Innovations You Can't Miss",
                    "Next-Gen Products Uncovered",
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </h1>
            <p className="text-white font-medium">
            Explore the hottest trends in technology, featuring the latest  tools and innovations <br /> that are transforming the digital landscape.            </p>
            <div><button className='btn px-10 bg-black text-white hover:text-yellow-600 hover:bg-black
           border-yellow-600 hover:border-0'>Get Started</button></div>
            </div>
        </div>
    );
};

export default Banner;