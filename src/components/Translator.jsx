
import { useEffect, useState } from "react";
import { TabsDefault } from "./Taps";
import axios from "axios";
import { Button } from "@material-tailwind/react";

const Translator = () => {
  const [text, setText] = useState('');
  const [detect, setDetect] = useState(true);

  const [from, setFromData] = useState('detect');
  const [to, setToData] = useState('ar');

  const [translated, setTranslated] = useState('');


  const trans = () => {
    const options = {
      method: 'POST',
      url: import.meta.env.VITE_REACT_APP_API_URL,
      params: {
        ...(detect ? {} : { 'from': from }),
        'to[0]': to,
        'api-version': '3.0',
        profanityAction: 'NoAction',
        textType: 'plain',
      },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': import.meta.env.VITE_REACT_APP_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_REACT_APP_HOST,
      },
      data: [
        {
          Text: text
        }
      ]
    };

    if (text) {
      try {
        axios.request(options)
          .then(res => setTranslated(res.data[0].translations[0].text))

      } catch (error) {
        console.error(error);
      }
    }
  }

  const setTo = (to) => {
    setToData(to);
  }
  const setFrom = (from) => {
    setDetect(false)
    setFromData(from);
  }
  const getTo = () => {
    return to;
  }
  const getFrom = () => {
    return from;
  }


  const setDetected = () => {
    setDetect(true)
  }

  useEffect(() => {
    console.log(from)
    console.log(to)
    // console.log(from)

    trans();
  }, [to, from, detect, text])

  return (
    <div className="mt-12 ">

      <div className="flex flex-col xl:flex-row items-center gap-8 mx-auto xl:gap-2">

        <div className="   max-w-[340px] sm:max-w-[500px] md:max-w-[750px]  w-full xl:max-w-[640px]  min-h-[200px]  flex-1  shadow-inner  relative">
          <TabsDefault setFrom={setFrom} setTo={setTo} setDetected={setDetected} getTo={getTo()} getFrom={getFrom()} />
          <textarea
            style={{direction:from==="ar"? "rtl":null}}
            className=" border-gray-300 border-[1px]   rounded-md min-h-[200px] min-w-[100%]  px-8 pt-4 text-xl focus:outline-none resize-none"
            spellCheck="false"
            value={text}
            onChange={(e) => { setText(e.target.value) }}
          >
          </textarea>
          <span
            className="absolute bottom-5  left-5 cursor-pointer group"
            onClick={() => { setText(""); setTranslated("") }}
          >
            <Button variant="gradient" size="sm" color="red">Clear</Button>
          </span>
        </div>


        <div className="max-w-[340px] sm:max-w-[500px] md:max-w-[750px]  w-full xl:max-w-[640px]  min-h-[200px]  flex-1  rounded-md">
          <TabsDefault to={true} setFrom={setFrom} setTo={setTo} getTo={getTo()} getFrom={getFrom()} />
          {/* {translated && */}
          <h2
            style={{ direction: translated? to === "ar" ? "rtl" : null:null }}
            className=" min-h-[200px] max-w-[340px] sm:max-w-[500px] md:max-w-[750px]  w-full xl:max-w-[640px]    pl-8 pt-4 text-xl " spellCheck="false" >
            {translated ? translated : "Translation"}
          </h2>
          {/* } */}

        </div>
      </div>
    </div>
  )
}

export default Translator