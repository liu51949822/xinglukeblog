import { FC } from "react";
import { Skill } from "./compoents/skill";
import { ExperienceTimeline } from "./compoents/ExperienceTimeline";
import { Person } from "./compoents/person";
import  Background  from "../background/background";
import {about} from "../../../config/me";


export const AboutMe : FC = () => {
  return (
    <div>
      <Background />
      <Skill data={about.panels} />
      <ExperienceTimeline />
            <Person data={about.persion} />
            

      
  
    </div>
  )
}
