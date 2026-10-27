import { getPortfolioProjects } from '../lib/github';
import PortfolioPage from '../components/PortfolioPage';
import GreetingScreen from '../components/GreetingScreen';

export default function Page() {
  const projects = getPortfolioProjects();
  return (
    <>
      <GreetingScreen />
      <PortfolioPage projects={projects} />
    </>
  );
}
