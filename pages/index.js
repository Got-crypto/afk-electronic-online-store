import { Product, HeroBanner, FooterBanner} from '../components'
import { client } from '../lib/client'

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: {
      products,
      bannerData
    }
  }
}

export default function Home({ products, bannerData }){
  return(
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
          <h2>
            Best Selling Product
          </h2>
          <p>
            Speakers of many variations
          </p>
          <div className="products-container">
            {products?.map((product, i) => <Product product={product} key={i} />)}
          </div>
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}
