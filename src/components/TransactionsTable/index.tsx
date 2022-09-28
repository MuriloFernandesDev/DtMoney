import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./style";

export function TransactionsTable() {
  const { test } = useTransactions();
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {test.map((res: any) => {
            return (
              <tr key={res.createdAt}>
                <td>{res.title}</td>
                <td className={res.type}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(res.amount)}
                </td>
                <td>{res.category}</td>

                <td>
                  {new Intl.DateTimeFormat("pt-BR").format(
                    new Date(res.createdAt)
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
}
