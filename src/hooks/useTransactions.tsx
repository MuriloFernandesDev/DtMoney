import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
  useRef,
} from "react";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

interface TransactionsProviderProps {
  children: ReactNode;
}
interface TransactionsContextData {
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  test: any;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  function getStorageValue(key: string, defaultValue: string) {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    }
  }

  const useLocalStorage = (key: string, initial: string) => {
    const [value] = useState(() => {
      return getStorageValue(key, initial ?? "");
    });
    return [value];
  };

  const [storage] = useLocalStorage("@DtMoney:Transaction", "");

  const [test, setTest] = useState<Transaction[] | any>(() => {
    if (storage) {
      return storage;
    }
    return [];
  });

  const prevTransactionRef = useRef<Transaction[]>();
  useEffect(() => {
    prevTransactionRef.current = test;
  });
  const transactionPreviewValue = prevTransactionRef.current ?? test;
  useEffect(() => {
    if (transactionPreviewValue !== test) {
      localStorage.setItem("@DtMoney:Transaction", JSON.stringify(test));
    }
  }, [test, transactionPreviewValue]);

  async function createTransaction(transactionInput: TransactionInput) {
    const updatedCart = [...test];
    // Verificando se ja existe o produto no carrinho

    updatedCart.push({ ...transactionInput, createdAt: new Date() });

    setTest(updatedCart);
  }

  return (
    <TransactionsContext.Provider value={{ createTransaction, test }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
