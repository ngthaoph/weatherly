import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutPage() {
  return (
    <Card className="max-w-3xl mx-auto px-4 py-10">
      <CardTitle className="text-3xl font-bold mb-4">About Us</CardTitle>
      <p className="mb-4 text-lg">
        At <span className="font-semibold">BabyNames.io</span>, we're passionate
        about the stories behind baby names. Every year, each Australian state
        and territory releases its list of the most popular names given to
        newborns. We collect and showcase this data in one place, making it easy
        to explore trends, discover name ideas, and see what names are rising or
        falling in popularity.
      </p>
      <p className="mb-4 text-lg">
        Names are more than just labels — they’re reflections of culture,
        fashion, and identity. Looking at naming trends can reveal generational
        shifts and social influences, helping us understand the spirit of the
        times.
      </p>
      <p className="mb-4 text-lg">
        As we approach the end of{" "}
        <span className="font-semibold">Generation Alpha (2010–2024)</span>,
        this year’s baby names will mark the close of a generation. From 2025,
        we enter{" "}
        <span className="font-semibold">Generation Beta (2025–2039)</span>,
        bringing with it a new wave of names and stories waiting to unfold.
      </p>
      <p className="text-lg">
        Whether you're choosing a name, curious about trends, or just love
        exploring names — you're in the right place.
      </p>
    </Card>
  );
}
