"use client";
import React, { useState, useEffect } from "react";
import { IconChecklist, IconDeviceDesktopAnalytics } from "@tabler/icons-react";
import Statistics from "@/components/statistics";
import NavbarComponent from "@/components/navbar";
import { useDisclosure } from "@mantine/hooks";
import { LoadingOverlay} from "@mantine/core";
import {
  Tabs,
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  Box,
  useMantineTheme,
} from "@mantine/core";

import dynamic from "next/dynamic";

const ConceptRecipe = dynamic(
  () => import("@/components/product-development/concept-recipe"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const TestRecipe = dynamic(
  () => import("@/components/product-development/test-recipe"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
const Homepage = () => {
  const [visible, { toggle }] = useDisclosure(true);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [currentTab, setCurrentTab] = useState("statistics");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      toggle();
    }, 2000);
  }, []);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case "statistics":
        return <Statistics />;
      case "task":
        return "task";
      case "operations":
        return "OPERATIONS";
      case "hr":
        return "hr";
      case "finance":
        return "<FinanceContent />";
      case "marketingSales":
        return "MARKETING_SALES";
      case "conceptRecipe":
        return <ConceptRecipe />;
      case "testRecipe":
        return <TestRecipe/>;
      default:
        return null;
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="text-center m-5">
          <Box maw={400} pos="relative">
            <LoadingOverlay visible={visible} overlayBlur={2} />
          </Box>
        </div>
      ) : (
        <AppShell
          styles={{
            main: {
              background:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          }}
          footer={
            <Footer height={60} p="md">
              Healthy INSIDE
            </Footer>
          }
          header={
            <Header height={{ base: 50, md: 70 }} p="md">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "space-between",
                }}
              >
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>
                <Text>DashBoard</Text>
                <MediaQuery
                  query="(max-width: 1000px) and (min-width: 250px)"
                  styles={{ display: "none" }}
                >
                  <Box>
                    <NavbarComponent
                      currentTab={currentTab}
                      onTabChange={handleTabChange}
                    />
                  </Box>
                </MediaQuery>

                <div>LoginInfo</div>
              </div>
            </Header>
          }
          navbar={
            <Navbar
              p="md"
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{ sm: 200, lg: 200 }}
            >
              <Tabs
                variant="pills"
                radius="md"
                orientation="vertical"
                defaultValue="statistics"
                onTabChange={(value: string) => {
                  setCurrentTab(value);
                  setOpened(!opened);
                }}
                value={currentTab}
              >
                <Tabs.List>
                  <Tabs.Tab
                    value="statistics"
                    icon={<IconDeviceDesktopAnalytics size="0.8rem" />}
                  >
                    Statistics
                  </Tabs.Tab>
                  <Tabs.Tab value="task" icon={<IconChecklist size="0.8rem" />}>
                    Task
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>
              <MediaQuery
                query="(min-width: 900px)"
                styles={{ display: "none" }}
              >
                <Box>
                  <NavbarComponent
                    currentTab={currentTab}
                    onTabChange={handleTabChange}
                  />
                </Box>
              </MediaQuery>
            </Navbar>
          }
        >
          <div className="root-page">{renderTabContent()}</div>
        </AppShell>
      )}
    </>
  );
};

export default Homepage;
