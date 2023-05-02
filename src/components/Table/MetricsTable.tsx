import { type IndivPkg } from "@prisma/client";
import { useInView } from "framer-motion";
import { useRef } from "react";

const MetricRow = (props: { metric: string; score: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
  });

  return (
    <div className="center-items flex flex-col p-1" ref={ref}>
      <div className="flex flex-row justify-between uppercase">
        <span>{props.metric.split(/(?=[A-Z])/).join(" ")}</span>
        <span>{props.score}</span>
      </div>
      <div className="my-4 rounded bg-gray-400">
        <div
          style={{
            width: inView ? `${props.score * 10}%` : "0%",
            transition: "width 1.5s ease-in-out",
          }}
          className="h-2 rounded bg-gradient-to-r from-[#5ae0f8] to-[#2d70c9]"
        />
      </div>
    </div>
  );
};

const MetricsTable = ({ pkg }: { pkg: IndivPkg | undefined }) => {
  if (!pkg)
    return (
      <div className="flex items-center justify-center">
        There is no package found for this id
      </div>
    );

  return (
    <div className="flex w-3/4 flex-col text-gray-200 xl:w-1/2">
      <div className="rounded-sm bg-gray-700 p-2 text-lg font-bold">
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
        <hr className="mb-2 border-gray-500" />
        <MetricRow
          metric="total"
          score={pkg["totalScore"] as unknown as number}
        />
      </div>
    </div>
  );
};

export default MetricsTable;
