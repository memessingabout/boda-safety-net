
import { useState } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, Search, Phone, Mail, FileText } from "lucide-react";

const Help = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      id: "faq-1",
      question: "How do I become a member of Digital Boda?",
      answer: "To become a member, you need to register through our website or visit our offices. You will need to provide your personal details, motorcycle registration, and national ID. After registration, you'll need to attend an orientation session and pay the membership fee."
    },
    {
      id: "faq-2",
      question: "What benefits do I get as a Digital Boda member?",
      answer: "As a member, you'll have access to training programs, welfare support including health insurance options, legal assistance, networking opportunities, financial services, and representation in dialogue with regulatory bodies and digital platforms."
    },
    {
      id: "faq-3",
      question: "How can I verify if a rider is a legitimate Digital Boda member?",
      answer: "You can verify a rider by checking their Digital Boda ID card or using our online verification system. Simply enter the rider's registration number on our Verify page to confirm their status."
    },
    {
      id: "faq-4",
      question: "What safety standards are Digital Boda riders expected to follow?",
      answer: "All our riders are expected to wear appropriate safety gear (helmets, reflective jackets), maintain their motorcycles regularly, follow traffic rules, avoid overloading, and ensure both they and their passengers wear helmets during rides."
    },
    {
      id: "faq-5",
      question: "How does Digital Boda handle complaints against riders?",
      answer: "We take complaints seriously. You can submit a complaint through our website, via email to complaint@digitalboda.co.ke, or by calling our customer service number. All complaints are investigated, and appropriate action is taken based on our code of conduct."
    },
    {
      id: "faq-6",
      question: "Are there training opportunities for Digital Boda members?",
      answer: "Yes, we regularly organize training sessions on road safety, defensive riding, customer service, financial literacy, and more. Members are informed about upcoming training opportunities through our communication channels."
    },
    {
      id: "faq-7",
      question: "How can I report a lost Digital Boda ID?",
      answer: "If you lose your Digital Boda ID, please contact our office immediately. You will need to fill out a form and pay a replacement fee to get a new ID issued."
    }
  ];

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs = faqs.filter(
    faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Help Center</h1>
          <p className="text-white text-lg">Find answers to common questions and get support.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Search */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <h2 className="text-2xl font-bold mb-6 text-primary">Frequently Asked Questions</h2>
          <div className="space-y-4 mb-12">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <Card key={faq.id} className="overflow-hidden">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
                  >
                    <h3 className="text-lg font-medium">{faq.question}</h3>
                    {openFaqId === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                  <CardContent className={`px-6 pt-0 pb-4 ${openFaqId === faq.id ? 'block' : 'hidden'}`}>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 bg-light rounded-lg">
                <p className="text-muted-foreground">No matching FAQ found. Please try a different search term or contact us for assistance.</p>
              </div>
            )}
          </div>

          {/* Support Options */}
          <h2 className="text-2xl font-bold mb-6 text-primary">Need More Help?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Our support team is available Monday to Saturday.</p>
                <div className="space-y-1">
                  <p>+254 702 423004</p>
                  <p>+254 723 983222</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Email Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Send us an email and we'll get back to you.</p>
                <div className="space-y-1">
                  <p>info@digitalboda.co.ke</p>
                  <p>complaint@digitalboda.co.ke</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Check our guides and documentation.</p>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Rider Handbook
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Safety Guidelines
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Help;
