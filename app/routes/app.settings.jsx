import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  useBreakpoints,
  TextField,
  Divider,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";


export async function loader() {
  // provides data to the component
  let settings = {
    name: "My app name",
    description: "My app description"
  }
  return json(settings);
}

export async function action({request}) {
  // updates persistent data
  let settings = await request.formData();
  settings = Object.fromEntries(settings);

  return json(settings);
}

// This example is for guidance purposes. Copying it will come with caveats.
export default function SettingsPage() {
  const settings = useLoaderData();
  const [formState, setFormState] = useState(settings);

  const { smUp } = useBreakpoints();
  return (
    <Page>
      <TitleBar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }} 
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app preferences and descriptions
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method = "POST">
            <BlockStack gap="400">
              <TextField label="App name" name="name for app" value= {formState.name} onChange={(value) => setFormState({...formState, name: value})}/>
              <TextField label="Description" name="description for app" value= {formState.description} onChange={(value) => setFormState({...formState, description: value})}/>
            </BlockStack>
            <button submit = {true}>Save</button>
            </Form>
          </Card>

          
        </InlineGrid>
        {smUp ? <Divider /> : null}
        {/* <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Dimensions
              </Text>
              <Text as="p" variant="bodyMd">
                Interjambs are the rounded protruding bits of your puzzlie piece
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <TextField label="Horizontal" />
              <TextField label="Interjamb ratio" />
            </BlockStack>
          </Card>
        </InlineGrid> */}
      </BlockStack>
    </Page>
  )
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
