import { Container } from "../../shared/Container/Container"
import { Product } from "./components/Product/Product"

export const Market = () => {
  return (
    <div style={{ padding: "var(--mantine-spacing-md)" }}>
      <Container>
        <h1>Магазин</h1>

        <Product
          name="Усиление 1"
          description="Описание усиления"
          price="200"
        />

        <Product
          name="Усиление 2"
          description="Описание усиления"
          price="100"
        />
      </Container>
    </div>
  )
}