import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Heading from "../../components/Heading";
import img from "../../assets/pgdm.webp";
export default function ProgramsOffered() {
  const specializations = [
    "Marketing & Innovation Management",
    "Financial Management",
    "Human Resource Management",
    "Business Analytics & Research Management",
    "International Business Management",
    "Information Technology Management",
    "Operations Management",
    "Entrepreneurship Management",
  ];

  return (
    <div className="bg-gray-200 lg:py-20 md:py-12 py-8 sm:px-0 px-6">
      <Heading
        title="Programmes Offered with Dual Specializations"
        titleClassName="text-center text-2xl font-bold text-primary-color md:text-3xl lg:text-5xl"
      />

      <Tabs defaultValue="pgdm" className="mx-auto max-w-6xl">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger
            value="pgdm"
            className="text-xs sm:text-xl h-full font-bold  data-[state=active]:bg-primary-color data-[state=active]:text-white"
          >
            PGDM Programmes
          </TabsTrigger>
          <TabsTrigger
            value="bba"
            className="text-xs sm:text-xl h-full font-bold  data-[state=active]:bg-primary-color data-[state=active]:text-white"
          >
            BBA Programmes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pgdm">
          <ProgramContent
            title="PGDM"
            specializations={specializations}
            imageSrc={img}
            imageAlt="PGDM students studying"
          />
        </TabsContent>
        <TabsContent value="bba">
          <ProgramContent
            title="BBA"
            specializations={specializations.slice(0, 5)} // Assuming fewer specializations for BBA
            imageSrc={img}
            imageAlt="BBA students in classroom"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProgramContent({ title, specializations, imageSrc, imageAlt }) {
  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover hover:scale-125 duration-300"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-primary-color p-4 text-white">
          <h2 className="text-xl font-bold">{title} Programmes</h2>
        </div>
      </div>

      <div className="rounded-lg relative bg-black p-6 text-white">
        <h2 className="mb-4 text-xl font-bold">{title} Programmes</h2>
        <h3 className="mb-2 font-semibold text-p">{title}</h3>
        <ul className="mb-6 space-y-2">
          {specializations.map((spec, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-pink-800" />
              {spec}
            </li>
          ))}
        </ul>
        <div className="flex sm:absolute sm:bottom-5 sm:right-5 justify-end gap-4">
          <Button
            variant="outline"
            className="border-primary-color text-primary-color hover:bg-primary-color hover:text-white"
          >
            Apply Now
          </Button>
          <Button className="bg-primary-color hover:bg-primary-color/90">
            Know More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
