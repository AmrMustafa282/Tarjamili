import {
  Tabs,
  TabsHeader,
  Select,
  Option,
} from "@material-tailwind/react";

import { apiData } from "../assets/Langs"
import { useState } from "react";
export function TabsDefault({ to, setFrom, setTo, setDetected, getFrom, getTo, getDetectedLang, restDetectLang }) {

  const [val, setVal] = useState(false)
  const [selVal, setSelVal] = useState('');


  const handelFrom = (val) => {
    setTo(getFrom);
    setFrom(val);

  }
  const handelTo = (val) => {
    setFrom(getTo);
    setTo(val);
  }




  const data = [
    (to ? {} : {
      label: getDetectedLang
        ?
        `${apiData.filter((e) => e.code === getDetectedLang)[0].name}-Detected`
        :
        "Detect",
      value: "detect",
      onClick: () => {
        setDetected();
        setVal(true);
      },
    }),

    {
      label: "English",
      value: "en",
      onClick: (val) => {
        to
          ? (getFrom === val) ? handelTo(val) : setTo(val)
          : (getTo === val) ? handelFrom(val) : setFrom(val)

      },
    }, {
      label: "Arabic",
      value: "ar",
      onClick: (val) => {
        to
          ? (getFrom === val) ? handelTo(val) : setTo(val)
          : (getTo === val) ? handelFrom(val) : setFrom(val)
      },
    }, {
      label: "French",
      value: "fr",
      onClick: (val) => {
        to
          ? (getFrom === val) ? handelTo(val) : setTo(val)
          : (getTo === val) ? handelFrom(val) : setFrom(val)
      },
    }, {
      label: "Spanish",
      value: "es",
      onClick: (val) => {
        to
          ? (getFrom === val) ? handelTo(val) : setTo(val)
          : (getTo === val) ? handelFrom(val) : setFrom(val)
      },
    },
  ];
  return (
    <>
      <Tabs value="">

        <TabsHeader
          className="bg-transparent "
        >
          <div className="flex max-w-[135px] sm:max-w-none overflow-hidden">
            {data.map(({ label, value, onClick }) => (
              value &&
              <button size="sm"
                key={value}
                className={
                  "px-2 py-1 xl:px-3 xl:py-2  rounded-lg duration-200 text-sm font-semibold " +
                  (val
                    ?
                    (value === "detect")
                      ? "bg-gray-900/10 shadow-none  !text-gray-900"
                      : ""
                    :
                    to
                      ? value === getTo ? "bg-gray-900/20 shadow-none  !text-gray-900" : " "
                      : value === getFrom ? "bg-gray-900/20 shadow-none  !text-gray-900" : " "
                  )
                }
                onClick={() => {
                  onClick(value);
                  setSelVal('');
                  value === "detect" ? null : setVal(false);
                  !to ?restDetectLang():null
                }}>
                {label}
              </button>
            ))}
          </div>

          <div className="ms-auto  w-32 xl:w-auto">
            <Select label="Language"
              lockScroll
              className=" w-32 xl:w-full"
              value={selVal}
            >
              {apiData.map((d) => (
                <Option key={d.code} value={d.code} className=" w-32 xl:w-full"
                  onClick={() => {
                    !to ? setFrom(d.code) : setTo(d.code);
                    setVal(false);
                    setSelVal(d.name);
                  }}
                >{d.name}</Option>
              ))}
            </Select>
          </div>
        </TabsHeader>
      </Tabs >
    </>

  );
}