import {motion} from 'framer-motion';
import type {NextPage} from 'next'
import Head from 'next/head'
import React, {ReactElement, useState} from "react";
import InfoRow from "../components/InfoRow";

const Home: NextPage = () => {
  const [checkList, setCheckList] = useState<string[]>([]);
  const [input, setInput] = useState<string>("1.1.1.1")

  const renderRows = (): ReactElement[] => {
    return checkList.map((ip: string) => <InfoRow key={ip} ip={ip} />)
  }

  return (
    <motion.div initial="initial"
                animate="animate"
                exit={{opacity: 0}}
                className="flex flex-col container mx-auto gap-4 mt-0 sm:pt-14 h-screen items-center">
      <Head>
        <title>IP Geo-Location Service</title>
        <meta name="description" content="Maps IP address to location" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <motion.div
        animate={{opacity: 1}}
        initial={{opacity: 0}}
        className={"w-full text-center"}>
        <h1 className="text-3xl underline underline-offset-4 decoration-2">IP Location</h1>
        <form onSubmit={handleFromSubmit} className={"pt-4 pb-4 w-full"}>
          <div className={"flex gap-1 justify-center"}>
            <input type="text"
                   value={input}
                   className={"bg-gray-900 bg-opacity-30 border-2 p-3 rounded-full basis-4/6"}
                   onClick={resetInput}
                   onChange={handleFormChange}
                   placeholder={"IPv4 address"} />
            <button className={"bg-sky-800 opacity-80 p-3 rounded hover:opacity-100 border-2"}>Check</button>
          </div>
        </form>


      </motion.div>
      <div className={"flex flex-col gap-4 w-full"}>
        {checkList.length > 0 && renderRows()}
      </div>
      <div className={"text-center opacity-80"}>
        Copyright {new Date().getFullYear()} <a href={"https://fantasm.vercel.app/"} className={"text-sky-400"}>Fantasm</a>
      </div>
    </motion.div>
  )

  function handleFormChange(event: React.ChangeEvent): void {
    event.preventDefault()
    setInput(event.target.value);
  }

  function handleFromSubmit(event: React.FormEvent): void {
    event.preventDefault();
    const sanitizedIp: string | null = sanitizeInput(input);
    if (sanitizedIp) {
      if (checkList.findIndex(ip => ip === sanitizedIp) < 0) {
        addNewIp(sanitizedIp);
      } else {
        // ip already checked
      }
    } else {
      // error
    }
  }

  function resetInput(event: React.FormEvent): void {
    setInput("");
  }

  function sanitizeInput(input: string): string | null {
    const regex: RegExp = new RegExp('([0-9]{1,3}\\.){3}[0-9]{1,3}');
    let check = input.match(regex);
    if (check && check.length > 0) return check[0]
    return null;
  }

  function addNewIp(ip: string): void {
    setCheckList([ip, ...checkList]);
  }
}

export default Home