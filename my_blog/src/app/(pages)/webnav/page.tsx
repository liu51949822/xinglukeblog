import { WebNav } from "@/app/_components/web_nav/WebNav";
import { weblinkConfig } from "@/config/web";
import { WeblinkConfig, WeblinkType, WeblinkTypeLabel } from "@/libs/weblink";

interface DaohangPageProps {
  links?: WeblinkConfig[];
}

const DaohangPage = ({ links = weblinkConfig }: DaohangPageProps) => {
  const transformedLinks = links.map(link => ({
    name: link.shortName,
    url: link.url,
    description: link.desc,
    icon: link.logo,
    type: WeblinkTypeLabel[(link.type ?? WeblinkType.Default) as WeblinkType]
  }));

  return <WebNav links={transformedLinks} />;
};

export default DaohangPage;