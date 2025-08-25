
import { Helmet } from "react-helmet";

function SeoHelmet({ lang }) {
  return (
    <Helmet>
      <html lang={lang} />
      <title>N60.ai – AI Tools for SMBs</title>
      <meta name="description" content="Powerful, understandable AI tools designed for small and medium-sized businesses in Norway." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
}

export default SeoHelmet;
