import { FC } from "react";
import { AboutMeProps } from "./about";

export interface SkillProps {
  data: AboutMeProps["panels"];
  loading?: boolean;
}

export const Skill: FC<SkillProps> = ({ data, loading = false }) => {
  if (loading) {
    return (
      <div className="tw-pt-20 tw-py-12 tw-text-center tw-text-gray-500">
        加载中...
      </div>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="tw-pt-20 tw-py-12 tw-text-center tw-text-gray-500">
        暂无技能数据
      </div>
    );
  }

  const categories = Object.values(data);

  return (
    <div className="tw-pt-20 tw-py-12">
      <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-16 md:tw-gap-20 lg:tw-gap-24 xl:tw-gap-28 tw-pb-6 tw-scrollbar-hide">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className="tw-flex-shrink-0 tw-w-72 md:tw-w-80 lg:tw-w-96 xl:tw-w-[28rem] tw-bg-gray-800/40 tw-rounded-2xl tw-p-8 tw-border tw-border-gray-700 tw-shadow-lg hover:tw-bg-gray-700/40 tw-transition-all tw-shadow-gray-900/20"
          >
            <h2 className="tw-text-xl tw-font-bold tw-text-gray-100 tw-mb-6 tw-border-b tw-border-gray-700/50 tw-pb-4 tw-text-center">
              {category.title}
            </h2>

            <div className="tw-flex tw-flex-col tw-gap-4">
              {category.data.map((skill, i) => (
                <div
                  key={i}
                  className="tw-bg-gray-700/50 tw-text-gray-200 tw-text-base tw-px-6 tw-py-3.5 tw-rounded-xl tw-border tw-border-gray-600 hover:tw-bg-primary/30 tw-transition-colors tw-whitespace-nowrap tw-text-center tw-shadow-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};