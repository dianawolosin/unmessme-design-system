import { z } from "zod";
import { ToolDefinition } from "./index.js";

const layoutTemplates: Record<string, string> = {
  dashboard: `import { Box, Card, Heading, Text, Button } from '@unmessme/design-system';

export function Dashboard() {
  return (
    <Box sx={{ padding: 4 }}>
      <Heading level={1}>Dashboard</Heading>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, marginTop: 4 }}>
        <Card>
          <Heading level={3}>Metric 1</Heading>
          <Text>Value: 1,234</Text>
        </Card>
        
        <Card>
          <Heading level={3}>Metric 2</Heading>
          <Text>Value: 5,678</Text>
        </Card>
        
        <Card>
          <Heading level={3}>Metric 3</Heading>
          <Text>Value: 9,012</Text>
        </Card>
      </Box>
    </Box>
  );
}`,
  
  form: `import { Box, Heading, Input, Button, Stack } from '@unmessme/design-system';

export function FormPage() {
  return (
    <Box sx={{ maxWidth: '600px', margin: '0 auto', padding: 4 }}>
      <Heading level={1}>Form</Heading>
      
      <Stack spacing={3} sx={{ marginTop: 4 }}>
        <Input label="Name" placeholder="Enter your name" />
        <Input label="Email" type="email" placeholder="Enter your email" />
        <Input label="Message" multiline rows={4} placeholder="Enter your message" />
        
        <Button variant="primary" size="md">
          Submit
        </Button>
      </Stack>
    </Box>
  );
}`,
  
  landing: `import { Box, Heading, Text, Button, Stack } from '@unmessme/design-system';

export function LandingPage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', padding: 8, backgroundColor: 'primary.main' }}>
        <Heading level={1} sx={{ color: 'white' }}>
          Welcome to UnmessMe
        </Heading>
        <Text sx={{ color: 'white', marginTop: 2, fontSize: 'lg' }}>
          The design system that makes sense
        </Text>
        <Button variant="secondary" size="lg" sx={{ marginTop: 4 }}>
          Get Started
        </Button>
      </Box>
      
      {/* Features Section */}
      <Box sx={{ padding: 8 }}>
        <Heading level={2} sx={{ textAlign: 'center' }}>Features</Heading>
        <Stack spacing={4} sx={{ marginTop: 4 }}>
          <Box>
            <Heading level={3}>Feature 1</Heading>
            <Text>Description of feature 1</Text>
          </Box>
          <Box>
            <Heading level={3}>Feature 2</Heading>
            <Text>Description of feature 2</Text>
          </Box>
          <Box>
            <Heading level={3}>Feature 3</Heading>
            <Text>Description of feature 3</Text>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}`
};

export const generatePageLayoutTool: ToolDefinition = {
  name: "generate_page_layout",
  description: "Generate a complete page layout using design system components (dashboard, form, or landing page)",
  inputSchema: z.object({
    layout_type: z.enum(["dashboard", "form", "landing"]).describe("Type of page layout to generate"),
    customize: z.string().optional().describe("Optional customization instructions"),
  }),
  handler: async (args: { layout_type: string; customize?: string }) => {
    const { layout_type, customize } = args;
    
    try {
      const template = layoutTemplates[layout_type];
      
      if (!template) {
        return {
          error: `Layout type '${layout_type}' not found`,
          available: Object.keys(layoutTemplates)
        };
      }
      
      return {
        layout_type: layout_type,
        code: template,
        customization_note: customize 
          ? `Note: To apply customization "${customize}", modify the generated code accordingly.`
          : undefined
      };
      
    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  },
};

