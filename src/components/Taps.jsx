import {
  Tabs,
  TabsHeader,
  Select,
  Option,
} from "@material-tailwind/react";

import { apiData } from "../assets/Langs"
import { useState } from "react";
export function TabsDefault({ to, setFrom, setTo, setDetected, getFrom, getTo, getDetectedLang, restDetectLang }) {

  const flags = ['en', 'ar', 'fr', 'es', 'nl'];
  const [val, setVal] = useState(false)


  const handelFrom = (val) => {
    [flags[0], flags[1]] = [flags[1], flags[0]];
    console.log("herer");
    console.log(data)
    // [flags[flags.indexOf(getFrom)], flags[flags.indexOf(val)]] = [flags[flags.indexOf(val)], flags[flags.indexOf(getFrom)]]
    setTo(getFrom);
    setFrom(val);

  }
  const handelTo = (val) => {
    [flags[flags.indexOf(getTo)], flags[flags.indexOf(val)]] = [flags[flags.indexOf(val)], flags[flags.indexOf(getTo)]]
    setFrom(getTo);
    setTo(val);
  }


  // console.log(getDetectedLang)


  const data = [
    (to ? {} : {
      label: getDetectedLang
        ?
        `${apiData.filter((e) => e.code === getDetectedLang)[0].name}-Detected`
        :
        "Detect",
      value: "detect",
      fvalue: "detect",
      onClick: () => {
        setDetected();
        setVal(true);
      },
    }),

    {
      label: "English",
      value: "en",
      fvalue: flags[0],
      onClick: (val) => {
        to
          ? (getFrom === val) ? handelTo(val) : setTo(val)
          : (getTo === val) ? handelFrom(val) : setFrom(val)

      },
    }, {
      label: "Arabic",
      value: "ar",
      fvalue: flags[1],
      onClick: (val) => {
        to
          ? (getFrom === val) ? handelTo(val) : setTo(val)
          : (getTo === val) ? handelFrom(val) : setFrom(val)
      },
    }, {
      label: "French",
      value: "fr",
      fvalue: flags[2],
      onClick: (val) => {
        to
          ? (getFrom === val) ? handelTo(val) : setTo(val)
          : (getTo === val) ? handelFrom(val) : setFrom(val)
      },
    }, {
      label: "Spanish",
      value: "es",
      fvalue: flags[3],
      onClick: (val) => {
        to
          ? (getFrom === val) ? handelTo(val) : setTo(val)
          : (getTo === val) ? handelFrom(val) : setFrom(val)
      },
    },
    // {
    //   label: "Dutch",
    //   value: "nl",
    //   fvalue: flags[4],
    //   onClick: (val) => {
    //     to
    //       ? (getFrom === val) ? handelTo(val) : setTo(val)
    //       : (getTo === val) ? handelFrom(val) : setFrom(val)
    //   },
    // },
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
                  value === "detect" ? null : setVal(false); restDetectLang();
                }}>
                {label}
              </button>
            ))}
          </div>

          <div className="ms-auto  w-32 xl:w-auto">
            <Select label="Language"
              lockScroll
              className=" w-32 xl:w-full"

            >
              {apiData.map((d) => (
                <Option key={d.code} value={d.code} className=" w-32 xl:w-full"
                  onClick={() => {
                    !to ? setFrom(d.code) : setTo(d.code);
                    setVal(true);
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