import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import img from "../../assets/admissions/admissionsBanner.webp";
import AboutSidebar from "../../components/AboutSidebar";
import ProcessAndFees from "./ProcessAndFees";
const sidebarLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#application-process", label: "Application Process" },
  { href: "#tuition-fees", label: "Tuition Fees" },
  { href: "#scholarships", label: "Scholarships" },
];
const Admissions = () => {
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/admissions", label: "Admissions" },
    { label: "Admissions" },
  ];
  return (
    <div className="relative min-h-screen ">
      <ImgAndBreadcrumb
        title="Admissions"
        imageSrc={img}
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
      <Container className="container grid grid-cols-1 md:grid-cols-4 gap-14">
        <div className="col-span-1 pt-12 md:col-span-3">
          <Heading
            title="Admission Process & Fees"
            titleClassName="text-primary-color text-left lg:text-5xl"
            subtitleClassName="text-gray-500 text-justify m-0 lg:text-lg lg:font-normal lg:max-w-full"
            subtitle="Discover our comprehensive admission process and fee structure. We're committed to making quality education accessible while maintaining transparency throughout your application journey."
            className="lg:pb-10"
          />
          <ProcessAndFees />
        </div>
        <div className="self-start md:sticky md:top-5 hover:translate-x-3 hover:translate-y-3 transition-all duration-500">
          <AboutSidebar
            sidebarLinks={sidebarLinks}
            className="bg-black hover:bg-black/90"
          />
        </div>
      </Container>
    </div>
  );
};

export default Admissions;