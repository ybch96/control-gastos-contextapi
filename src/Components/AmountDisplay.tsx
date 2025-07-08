import { formatCurrency } from "../helpers";
type AmountDisplayProps = {
  text?: string;
  amount: number;
};
export default function AmountDisplay({ text, amount }: AmountDisplayProps) {
  return (
    <p className="flex justify-center items-center text-blue-600 gap-2 text-2xl font-bold">
      {text && `${text}:`}
      <span className="text-black font-black">{formatCurrency(amount)}</span>
    </p>
  );
}
