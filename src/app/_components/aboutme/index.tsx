import { FC } from "react";
import { Skill } from "./compoents/skill";
import { AboutTimeline } from "./compoents/timeLine";
import { Person } from "./compoents/person";
import  Background  from "../background/background";
import {about} from "../../../config/me";


export const AboutMe : FC = () => {
  return (
    <div>
      <Background />
      <Skill data={about.panels} />
      <AboutTimeline data={about.timeline} />
            <Person data={about.persion} />
            

      
  
    </div>
  )
}
