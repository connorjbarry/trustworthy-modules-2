import Head from "next/head";
import { motion } from "framer-motion";
import { useState } from "react";
import ApiSpecs from "../components/ApiSpecs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { TbPackage, TbPackages } from "react-icons/tb"
import { IoLockClosed } from "react-icons/io5";
import { RxReload } from "react-icons/rx";
import { HiOutlineIdentification, HiChartBar } from "react-icons/hi";
import { RiCodeSSlashFill } from "react-icons/ri";
import { TiDocumentText } from "react-icons/ti";

/*
 * Doc page
 * This will be the documentation page of the
 * usage of the app and our api.
 * This will be a static page.
 * The following is the structure of the api documentation:
 * /packages
 * /package
 * /package/{id}
 * /package/{id}/rate
 * /package/byName/{name}
 * /package/byRegEx/
 * /authenticate
 * /reset
 */
const Doc = (): JSX.Element => {
  // react state for package api expansion
  const [collapsePackageApi, setCollapsePackageApi] = useState(false);

  return (
    <>
      <Head>
        <title>Documentation</title>
        <meta
          name="description"
          content="Documentation for the usage of our app and api"
        />
        <meta name="keywords" content="documentation, api, usage, app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center"
      >
        <h1 className="text-4xl font-bold">Documentation 	&#128217;</h1>
        <div className="flex flex-row">
          <motion.div 
            initial={{ x: -25 }}
            animate={{ x: 0 }}
            exit={{ x: -25 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex flex-none flex-col w-64 p-2"
          >
            <h2 className="text-3xl font-bold text-center py-4">Links &#128279;</h2>
            <div className="flex flex-row items-center justify-between hover:bg-slate-700 rounded-md p-2">
              <TbPackages className="text-xl" />
              <a href="#packages"><span className="font-bold hover:underline">Packages</span></a>
              <span className="w-[20px]"></span>
            </div>
            <div 
              className="flex flex-row items-center justify-between hover:bg-slate-700 rounded-md p-2"  
            >
              <TbPackage className="text-xl" />
              <a href="#package"><span className="font-bold hover:underline">Package</span></a>
              {
                collapsePackageApi ? (
                  <MdKeyboardArrowUp
                    className="text-xl hover:cursor-pointer"
                    onClick={() => setCollapsePackageApi(false)}
                  />
                ) : (
                  <MdKeyboardArrowDown
                    className="text-xl hover:cursor-pointer"
                    onClick={() => setCollapsePackageApi(true)}
                  />
                ) 
              }
            </div>
            {
              collapsePackageApi && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="px-4"
                >
                  <div className="flex flex-row items-center justify-between p-2 hover:bg-slate-700 rounded-md">
                    <HiOutlineIdentification className="text-xl" />
                    <a href="#package-id" ><span className="font-bold hover:underline">id</span></a>
                    <span className="w-[20px]"></span>
                  </div>
                  <div className="flex flex-row items-center justify-between p-2 hover:bg-slate-700 rounded-md">
                    <HiChartBar className="text-xl" />
                    <a href="#package-id-rate"><span className="font-bold hover:underline">rate</span></a>
                    <span className="w-[20px]"></span>
                  </div>
                  <div className="flex flex-row items-center justify-between p-2 hover:bg-slate-700 rounded-md"> 
                    <TiDocumentText className="text-xl" />
                    <a href="#package-byName"><span className="font-bold hover:underline">byName</span></a>
                    <span className="w-[20px]"></span>
                  </div>
                  <div className="flex flex-row items-center justify-between p-2 hover:bg-slate-700 rounded-md">
                    <RiCodeSSlashFill className="text-xl" />
                    <a href="#package-byRegEx"><span className="font-bold hover:underline">byRegEx</span></a>
                    <span className="w-[20px]"></span>
                  </div>
                </motion.div>
              )
            }
            <div className="flex flex-row items-center justify-between py-2 hover:bg-slate-700 rounded-md p-2">
              <IoLockClosed className="text-xl" />
              <a href="#authenticate"><span className="font-bold hover:underline">Authenticate</span></a>
              <span className="w-[20px]"></span>
            </div>
            <div className="flex flex-row items-center justify-between py-2 hover:bg-slate-700 rounded-md p-2">
              <RxReload className="text-xl" />
              <a href="#reset"><span className="font-bold hover:underline">Reset</span></a>
              <span className="w-[20px]"></span>
            </div>
          </motion.div>
          <ApiSpecs />
        </div>
      </motion.main>
    </>
  );
};

export default Doc;
