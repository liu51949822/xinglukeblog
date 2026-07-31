import { FC } from "react";
import type { Person as pers } from "./base";

interface PersonProps {
  data: pers;
}

export const Person: FC<PersonProps> = ({ data }) => {
  return (
    <div className="tw-flex tw-justify-center tw-items-center tw-pt-20">
      <div className="tw-w-full tw-max-w-md"> {/* 限制最大宽度，居中显示 */}
        <div className="tw-bg-gray-800/40 tw-rounded-2xl tw-p-8 tw-border tw-border-gray-700 tw-shadow-lg hover:tw-bg-gray-700/40 tw-transition-all tw-shadow-gray-900/20">
          <h3 className="tw-text-2xl tw-font-bold tw-text-white tw-mb-6 tw-text-center">{data.name}</h3>
          
          <div className="tw-space-y-4">
            <div className="tw-flex tw-items-center tw-gap-3 tw-py-2">
              <span className="tw-text-gray-400 tw-w-16 tw-font-medium">性别：</span>
              <span className="tw-text-gray-200 tw-flex-1">{data.sex}</span>
            </div>
            
            <div className="tw-flex tw-items-center tw-gap-3 tw-py-2">
              <span className="tw-text-gray-400 tw-w-16 tw-font-medium">邮箱：</span>
              <span className="tw-text-gray-200 tw-flex-1">{data.email}</span>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};