import { api } from "../../utils/api";
import {RiAddCircleFill} from 'react-icons/ri'
import {TiDelete} from 'react-icons/ti'
import {MdDownload} from 'react-icons/md'
import {RxUpdate} from 'react-icons/rx'

type ActionLog = {
    id: string;
    action: string;
    username: string;
    date: Date;
}

// take in the package id as a prop
const ActionTables = (
    { pkgid }: { pkgid: string }
): JSX.Element => {
// get the action logs for the package
  const actionLogs = api.packages.getActions.useQuery({ id: pkgid}).data as ActionLog[];
    
  // map the action logs to list items
  const actionLogItems: JSX.Element[] = actionLogs.map((actionLog: ActionLog) => (
    <li className="pt-3 pb-0 sm:pt-4" key={actionLog.id}>
        <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                {
                    actionLog.action === 'CREATE' ? <RiAddCircleFill className="w-6 h-6 text-green-500" /> :
                    actionLog.action === 'DELETE' ? <TiDelete className="w-6 h-6 text-red-500" /> :
                    actionLog.action === 'DOWNLOAD' ? <MdDownload className="w-6 h-6 text-blue-500" /> :
                    actionLog.action === 'UPDATE' ? <RxUpdate className="w-6 h-6 text-yellow-500" /> :
                    <div></div>
                }
            </div>
            <div className="flex-1 min-w-0 p-1">
                <p className="text-base font-medium text-gray-900 truncate dark:text-white">
                    {actionLog.username}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {actionLog.action.toLowerCase()}
                </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {actionLog.date.toLocaleDateString() + " " + actionLog.date.toLocaleTimeString()}
            </div>
        </div>
    </li>
  ));

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-center mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Actions</h5>
       </div>
       <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">  
                {actionLogItems?.reverse()}               
            </ul>
       </div>
    </div>
    
  );
}

export default ActionTables;

