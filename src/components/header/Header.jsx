import './header.css'
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns"
import { useNavigate } from 'react-router-dom';

const Header = ({type}) => {
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          
          key: 'selection'
        }
      ]);
      
      const [openOptions, setOpenOptions] = useState(false)
      const[options,setOptions]=useState({
        adult:1,
        children:0,
      });

      const navigate = useNavigate()

      const handleOption = (name, operation) => {
        setOptions((prev) => {
          return {
            ...prev,
            [name]: operation === "i" ? options[name] + 1 : options[name] -1,
          };
        });
      };

      const handleSearch = ()=>{
          navigate("/bookings", { state: { destination, date, options } });
      }
    return(
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
            <div className="headerList">
                <div className="headerListItem active">
                <i class="fa-solid fa-train"></i>
                <span>Trains</span>
                </div>

                <div className="headerListItem">
                <i class="fa-solid fa-hotel"></i>
                <span>Hotels</span>
                </div>

                <div className="headerListItem">
                <i class="fa-solid fa-arrows-up-to-line"></i>
                <span>Rail-dhrishti</span>
                </div>

                <div className="headerListItem">
                <i class="fa-solid fa-umbrella-beach"></i>
                <span>Holiday Packages</span>
                </div>

                <div className="headerListItem">
                <i class="fa-solid fa-mountain-sun"></i>
                <span>Gallery</span>
                </div>
                
                <div className="headerListItem">
                <i class="fa-solid fa-train-subway"></i>
                <span>Charter Train</span>
                </div></div>
            {type !== "list" &&
              <><h1 className="headerTitle">IRCTC-Safety | Security | Punctuality</h1>
            <p className="headerDesc">Have you not found the right one?
                Find a service suitable for you here.</p>
                    <a href="/t">
                    <button className="navButton">Book Tickets</button>
                    </a>
            <div className="headerSearch">
                 <div className="headerSearchItem">
                 <i class="fa-solid fa-location-dot"></i>
                 <input type="text" placeholder="Where are you going?" className="headerSearchInput" onChange={e=>setDestination(e.target.value)}/>
                 </div>
                 <div className="headerSearchItem">
                 <i class="fa-solid fa-calendar"></i>
                 <span onClick={()=>setOpenDate(!openDate)}className="headerSearchText">{`${format(date[0].startDate, "mm/dd/yyyy")}  `}</span>
                {openDate && (<DateRange
  editableDateInputs={true}
  onChange={item => setDate([item.selection])}
  moveRangeOnFirstSelection={false}
  ranges={date}
  className="date"
  minDate={new Date()}
/>)}
                 </div>
                 <div className="headerSearchItem">
                 <i class="fa-solid fa-person"></i>
                 <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult . ${options.children} children`} </span>
                    {openOptions && <div className="options">
                        <div className="optionItem">
                          <span className="optionText">Adult</span>
                          <div className="optionCounter">
                          <button disabled={options.adult<=1} className="optionCounterButton" onClick={()=>handleOption("adult", "d")}>-</button>
                          <span className="optionCounterNumber">{options.adult}</span>
                          <button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
                        </div>
                        </div>
                        <div className="optionItem">
                          <span className="optionText">Children</span>
                          <div className="optionCounter">
                          <button  disabled={options.children<1}className="optionCounterButton" onClick={()=>handleOption("children", "d")}>-</button>
                          <span className="optionCounterNumber">{options.children}</span>
                          <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
                        </div>
                        </div>
                      </div> }
                </div>
                 <div className="headerSearchItem">
                 <button className="headerBtn" onClick={handleSearch}>Search</button>
                 
                 </div>
            </div></>}
        </div>
    </div>
    );
};
export default Header