import { type IndivPkg } from "@prisma/client";
import { useInView } from "framer-motion";
import { useRef } from "react";

// const MetricsRow = (props: {metric: string, score: number}) => {
//   return (
//     <tr className="">
//       <th
//         scope="row"
//         className="whitespace-nowrap px-6 py-4 font-medium uppercase"
//       >
//         {props.metric.split(/(?=[A-Z])/).join(" ")}
//       </th>
//       <td className="px-6 py-4">
//         {props.score}
//       </td>
//     </tr>
//   );
// };

// const MetricsTable = ({ pkg }: { pkg: IndivPkg | undefined }) => {
//   if (!pkg)
//     return (
//       <div className="flex items-center justify-center">
//         There is no package found for this id
//       </div>
//     );
//   return (
//     <div className="relative overflow-x-auto">
//       <table className="w-full text-left text-sm text-gray-400">
//         <thead className="bg-gray-700 text-xs uppercase text-gray-400">
//           <tr>
//             <th scope="col" className=" px-6 py-3">
//               Metric
//             </th>
//             <th scope="col" className=" px-6 py-3">
//               Score
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//         {Object.keys(pkg as unknown as string[]).map((key) => {
//             if (
//               key === "rampUp" ||
//               key === "correctness" ||
//               key === "licenseCompatability" ||
//               key === "busFactor" ||
//               key === "responsiveness" ||
//               key === "fractionDependencies" ||
//               key === "fractionReviewed"
//             )
//               return (
//                 <MetricsRow
//                   key={key}
//                   metric={key}
//                   score={pkg[key] as unknown as number}
//                 />
//               );
//           })}
//         </tbody>
//         <tfoot>
//           <tr className="font-semibold">
//             <th scope="row" className="px-6 py-3 text-base">
//               Total
//             </th>
//             <td className="px-6 py-3">
//               {pkg["totalScore"] as unknown as number}
//             </td>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   );
// };

const MetricRow = (props: {metric: string, score: number}) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
  });
  
  return (
    <div className="flex flex-col p-1 center-items" ref={ref}>
      <div className="flex flex-row justify-between uppercase">
        <span>{props.metric.split(/(?=[A-Z])/).join(" ")}</span>
        <span>{props.score}</span>
      </div>
      <div className="bg-gray-400 rounded my-4">
        <div
          style={{
            width: inView ? `${props.score*10}%` : "0%",
            transition: "width 1.5s ease-in-out",
          }}
          className="bg-gradient-to-r from-[#5ae0f8] to-[#2d70c9] h-2 rounded"
        />
      </div>
    </div>
  )
};


const MetricsTable = ({ pkg }: { pkg: IndivPkg | undefined }) => {
  if(!pkg) return <div className="flex items-center justify-center">There is no package found for this id</div>

  return (
    <div className="flex flex-col w-3/4 xl:w-1/2 text-gray-200">
      <div className="text-lg font-bold bg-gray-700 p-2 rounded-sm">
        <div className="flex flex-row justify-between">
          <span>Metric</span>
          <span>Score</span>
        </div>
      </div>
      <div className="p-1">
        {Object.keys(pkg as unknown as string[]).map((key) => {
          if (
            key === "rampUp" ||
            key === "correctness" ||
            key === "licenseCompatability" ||
            key === "busFactor" ||
            key === "responsiveness" ||
            key === "fractionDependencies" ||
            key === "fractionReviewed"
          )
            return (
              <MetricRow 
                key={key}
                metric={key}
                score={pkg[key] as unknown as number}
              />
            );
          })}
      </div>
      <div className="text-base font-bold">
        <hr className="border-gray-500 mb-2" />
        <MetricRow metric="total" score={pkg["totalScore"] as unknown as number}/>
      </div>
    </div>
  );
};

export default MetricsTable;
