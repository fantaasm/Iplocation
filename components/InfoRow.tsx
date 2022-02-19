import * as React from 'react';
import {memo} from 'react';
import useSWRImmutable from "swr/immutable";
import {fetcher} from "../utils/fetcher";
import {motion} from 'framer-motion';
import Flag from 'react-world-flags';

type Props = {
  ip: string;
}

const InfoRow = (props: Props): JSX.Element => {
  const {data, error} = useSWRImmutable(`/api/locate/${props.ip}`, fetcher)

  if (error || !data) return null
  if (data.status === "fail") return null;

  return (
    <motion.div
      animate={{scale: 1, opacity: 1, y: 0}}
      initial={{scale: 1, opacity: 0, y: -80}}
      transition={{duration: 0.25}}
      className={"w-full grid grid-cols-3 bg-lightDark rounded p-2 border-2 border-gray-700"}>
      <div>
        <h3 className={"bg-gray-800 p-2"}>Address</h3>
        <span className={"p-1"}>{data.query}</span>
      </div>
      <div>
        <h3 className={"bg-gray-900 p-2"}>Country</h3>
        <span className={"p-1 inline-flex gap-1"}>{data.country}<Flag code={data.countryCode}
                                                                      height={20}
                                                                      width={20} /></span>
      </div>
      <div>
        <h3 className={"bg-gray-800 p-2"}>Region</h3>
        <span className={"p-1"}>{`${data.regionName}, ${data.city}`}</span>
      </div>
      <div>
        <h3 className={"bg-gray-800 p-2"}>Isp</h3>
        <span className={"p-1"}>{data.isp}</span>
      </div>
      <div>
        <h3 className={"bg-gray-900 p-2"}>Longitude</h3>
        <span className={"p-1"}>{data.lon}</span>
      </div>
      <div>
        <h3 className={"bg-gray-800 p-2"}>Latitude</h3>
        <span className={"p-1"}>{data.lat}</span>
      </div>
    </motion.div>
  );
}

function areEqual(prevProps: Props, nextProps: Props) {
  return prevProps.ip === nextProps.ip;
}

export default memo(InfoRow, areEqual)