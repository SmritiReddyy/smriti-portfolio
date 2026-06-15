import { getPortfolioProjects } from '../lib/github';
import PortfolioPage from '../components/PortfolioPage';

export default function Page() {
  const projects = getPortfolioProjects();
  return <PortfolioPage projects={projects} />;
}
