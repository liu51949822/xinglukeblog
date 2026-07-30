'use client';

import type { FC } from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import { homeConfig } from '@/config/home';
import {
  Github, Linkedin, Mail, MapPin, ExternalLink,
  ChevronRight,
} from 'lucide-react';

import { HomeSeketon } from './skeleton';
import { FadeInMotion } from '../motion/fadeIn';
import { TypedText } from '../text/typed';
import { HomeBackground } from './background';
import { BoxCard } from './cards/box';
import { HomeContainer } from './container';

import $styles from './style.module.css';

const { profile, skills, typed, list, experience, projects } = homeConfig;

const skillColors = [
  'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300',
  'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-300',
  'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-300',
  'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-300',
];

export const Home: FC = () => {
  return (
    <>
      <div className="tw-fixed tw-inset-0 tw-z-0 tw-w-full tw-h-full">
        <HomeBackground />
      </div>
      <Suspense fallback={<HomeSeketon />}>
        <div className={$styles.home}>

          {/* HERO */}
          {profile && (
            <section className="tw-w-full tw-pt-24 tw-pb-8">
              <HomeContainer>
                <div className="tw-w-full tw-flex tw-flex-col lg:tw-flex-row tw-items-center tw-gap-8 lg:tw-gap-16">
                  <FadeInMotion side="left" className="tw-flex-1 tw-w-full lg:tw-w-1/2">
                    <div className="tw-space-y-4">
                      <div className="tw-inline-block tw-px-4 tw-py-1.5 tw-rounded-full tw-bg-blue-500/10 tw-border tw-border-blue-500/20 tw-text-blue-400 tw-text-sm">
                        {profile.title}
                      </div>
                      <h1 className="tw-text-4xl lg:tw-text-5xl tw-font-bold tw-text-white tw-leading-tight">
                        {profile.name}
                      </h1>
                      <p className="tw-text-xl tw-text-gray-400 tw-font-light">
                        {profile.subtitle}
                      </p>
                      <p className="tw-text-gray-400 tw-leading-relaxed tw-max-w-xl">
                        {profile.bio}
                      </p>
                      <div className="tw-flex tw-items-center tw-gap-4 tw-text-sm tw-text-gray-500">
                        <span className="tw-flex tw-items-center tw-gap-1">
                          <MapPin size={14} />
                          {profile.location}
                        </span>
                        <span className="tw-flex tw-items-center tw-gap-1">
                          <Mail size={14} />
                          {profile.email}
                        </span>
                      </div>
                      <div className="tw-flex tw-items-center tw-gap-3 tw-pt-2">
                        <a href={profile.social.github} target="_blank" rel="noopener noreferrer"
                          className="tw-p-2 tw-rounded-lg tw-bg-gray-800/50 tw-border tw-border-gray-700/50 hover:tw-border-blue-500/50 hover:tw-bg-blue-500/10 tw-transition-all tw-text-gray-400 hover:tw-text-blue-400">
                          <Github size={20} />
                        </a>
                        <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer"
                          className="tw-p-2 tw-rounded-lg tw-bg-gray-800/50 tw-border tw-border-gray-700/50 hover:tw-border-blue-500/50 hover:tw-bg-blue-500/10 tw-transition-all tw-text-gray-400 hover:tw-text-blue-400">
                          <Linkedin size={20} />
                        </a>
                        <a href={profile.social.email}
                          className="tw-p-2 tw-rounded-lg tw-bg-gray-800/50 tw-border tw-border-gray-700/50 hover:tw-border-blue-500/50 hover:tw-bg-blue-500/10 tw-transition-all tw-text-gray-400 hover:tw-text-blue-400">
                          <Mail size={20} />
                        </a>
                        <Link href="/myself"
                          className="tw-ml-2 tw-px-4 tw-py-2 tw-rounded-lg tw-bg-blue-500/10 tw-border tw-border-blue-500/30 hover:tw-bg-blue-500/20 tw-transition-all tw-text-blue-400 tw-text-sm tw-flex tw-items-center tw-gap-1">
                          了解更多 <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </FadeInMotion>

                  <FadeInMotion side="right" className="tw-w-full lg:tw-w-1/2">
                    <div className="tw-flex tw-flex-col tw-gap-4">
                      {typed && (
                        <TypedText
                          className="tw-flex tw-w-full tw-items-center tw-justify-center tw-font-lxgw tw-text-lg tw-text-gray-300 tw-bg-gray-900/40 tw-backdrop-blur-sm tw-rounded-xl tw-p-6 tw-border tw-border-gray-800/50"
                          data={typed}
                        />
                      )}
                      {list?.first?.data && (
                        <BoxCard
                          title=""
                          data={list.first.data}
                          speed={0.5}
                        />
                      )}
                    </div>
                  </FadeInMotion>
                </div>
              </HomeContainer>
            </section>
          )}

          {/* SKILLS */}
          {skills && skills.length > 0 && (
            <section className="tw-w-full tw-py-12">
              <HomeContainer>
                <FadeInMotion side="bottom" className="tw-w-full">
                  <h2 className="tw-text-2xl tw-font-bold tw-text-white tw-mb-8 tw-text-center">
                    技术栈
                  </h2>
                  <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-4">
                    {skills.map((group, idx) => (
                      <div
                        key={group.category}
                        className={`tw-rounded-xl tw-p-5 tw-border tw-bg-gradient-to-br ${skillColors[idx % skillColors.length]} tw-backdrop-blur-sm`}
                      >
                        <h3 className="tw-font-semibold tw-text-sm tw-uppercase tw-tracking-wider tw-mb-3 tw-opacity-80">
                          {group.category}
                        </h3>
                        <div className="tw-flex tw-flex-wrap tw-gap-2">
                          {group.items.map((skill) => (
                            <span
                              key={skill}
                              className="tw-text-xs tw-px-2.5 tw-py-1 tw-rounded-md tw-bg-white/10 tw-border tw-border-white/10"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeInMotion>
              </HomeContainer>
            </section>
          )}

          {/* EXPERIENCE */}
          {experience && experience.length > 0 && (
            <section className="tw-w-full tw-py-12">
              <HomeContainer>
                <FadeInMotion side="bottom" className="tw-w-full">
                  <h2 className="tw-text-2xl tw-font-bold tw-text-white tw-mb-8 tw-text-center">
                    工作经历
                  </h2>
                  <div className="tw-relative tw-pl-8 tw-border-l tw-border-gray-700/50 tw-space-y-8 tw-max-w-3xl tw-mx-auto">
                    {experience.map((exp, idx) => (
                      <FadeInMotion key={exp.period} side="left" delay={0.1 * idx}>
                        <div className="tw-relative">
                          <div className="tw-absolute tw-w-3 tw-h-3 tw-rounded-full tw-bg-blue-500 tw--left-[2.65rem] tw-top-1.5 tw-border-2 tw-border-gray-900" />
                          <div className="tw-bg-gray-800/30 tw-backdrop-blur-sm tw-rounded-lg tw-p-5 tw-border tw-border-gray-700/30 hover:tw-border-gray-600/50 tw-transition-all">
                            <span className="tw-text-xs tw-text-blue-400 tw-font-mono">
                              {exp.period}
                            </span>
                            <h3 className="tw-text-white tw-font-semibold tw-mt-1">
                              {exp.title}
                            </h3>
                            <p className="tw-text-gray-400 tw-text-sm">
                              {exp.company}
                            </p>
                            <p className="tw-text-gray-500 tw-text-sm tw-mt-2">
                              {exp.description}
                            </p>
                          </div>
                        </div>
                      </FadeInMotion>
                    ))}
                  </div>
                </FadeInMotion>
              </HomeContainer>
            </section>
          )}

          {/* PROJECTS */}
          {projects && projects.length > 0 && (
            <section className="tw-w-full tw-py-12">
              <HomeContainer>
                <FadeInMotion side="bottom" className="tw-w-full">
                  <h2 className="tw-text-2xl tw-font-bold tw-text-white tw-mb-8 tw-text-center">
                    项目展示
                  </h2>
                  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
                    {projects.map((project, idx) => (
                      <FadeInMotion key={project.title} side="bottom" delay={0.1 * idx}>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tw-block tw-group tw-rounded-xl tw-bg-gray-800/30 tw-backdrop-blur-sm tw-border tw-border-gray-700/30 hover:tw-border-blue-500/40 tw-p-6 tw-transition-all hover:tw-shadow-lg hover:tw-shadow-blue-500/5"
                        >
                          <div className="tw-flex tw-items-start tw-justify-between tw-mb-3">
                            <h3 className="tw-text-white tw-font-semibold tw-group-hover:tw-text-blue-400 tw-transition-colors">
                              {project.title}
                            </h3>
                            <ExternalLink size={16} className="tw-text-gray-500 tw-flex-shrink-0 tw-mt-1" />
                          </div>
                          <p className="tw-text-gray-400 tw-text-sm tw-mb-4 tw-leading-relaxed">
                            {project.description}
                          </p>
                          <div className="tw-flex tw-flex-wrap tw-gap-2">
                            {project.tech.map((t) => (
                              <span
                                key={t}
                                className="tw-text-xs tw-px-2 tw-py-0.5 tw-rounded tw-bg-gray-700/50 tw-text-gray-400"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </a>
                      </FadeInMotion>
                    ))}
                  </div>
                </FadeInMotion>
              </HomeContainer>
            </section>
          )}

          {/* CTA */}
          <section className="tw-w-full tw-py-16">
            <HomeContainer>
              <FadeInMotion side="bottom" className="tw-w-full tw-text-center">
                <h2 className="tw-text-2xl tw-font-bold tw-text-white tw-mb-4">
                  联系我
                </h2>
                <p className="tw-text-gray-400 tw-mb-6 tw-max-w-md tw-mx-auto">
                  如果你对我的经历感兴趣，或者有合作机会，欢迎联系我
                </p>
                <div className="tw-flex tw-items-center tw-justify-center tw-gap-4">
                  <a href={profile?.social.github} target="_blank" rel="noopener noreferrer"
                    className="tw-px-5 tw-py-2.5 tw-rounded-lg tw-bg-gray-800/50 tw-border tw-border-gray-700/50 hover:tw-border-blue-500/50 tw-transition-all tw-text-gray-300 hover:tw-text-blue-400 tw-flex tw-items-center tw-gap-2 tw-text-sm">
                    <Github size={16} /> GitHub
                  </a>
                  <a href={profile?.social.email}
                    className="tw-px-5 tw-py-2.5 tw-rounded-lg tw-bg-blue-500/10 tw-border tw-border-blue-500/30 hover:tw-bg-blue-500/20 tw-transition-all tw-text-blue-400 tw-flex tw-items-center tw-gap-2 tw-text-sm">
                    <Mail size={16} /> 发送邮件
                  </a>
                  <Link href="/ai-chat"
                    className="tw-px-5 tw-py-2.5 tw-rounded-lg tw-bg-gray-800/50 tw-border tw-border-gray-700/50 hover:tw-border-gray-600/50 tw-transition-all tw-text-gray-300 tw-flex tw-items-center tw-gap-2 tw-text-sm">
                    <ExternalLink size={16} /> AI 问我
                  </Link>
                </div>
              </FadeInMotion>
            </HomeContainer>
          </section>

        </div>
      </Suspense>
    </>
  );
};