import { Container } from "../../shared/Container/Container"
import { Product } from "./components/Product/Product"

export const Market = () => {
  return (
    <div style={{ padding: "var(--mantine-spacing-md)" }}>
      <Container>
        <h1>Магазин</h1>

        <Product
          name="Заморозка"
          description="Замораживает прогресс Ударного режима"
          price="200"
        />

      </Container>
    </div>
  )
}