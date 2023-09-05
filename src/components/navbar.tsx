import React from "react";
import { Tabs, Menu, Text } from "@mantine/core";
import {
  IconBusinessplan,
  IconSettings,
  IconCubeSend,
  IconReportAnalytics,
  IconBrandSuperhuman,
} from "@tabler/icons-react";

interface NavbarComponentProps {
  currentTab: string;
  onTabChange: (value: string) => void;
}
const NavbarComponent: React.FC<NavbarComponentProps> = ({
  currentTab,
  onTabChange,
}) => {
  return (
    <Tabs
      variant="pills"
      radius="md"
      value={currentTab}
      onTabChange={onTabChange}
    >
      <Tabs.List>

        <Tabs.Tab value="productDevelopment" icon={<IconCubeSend size="0.8rem" />}>
          <Text size="sm"> PRODUCT DEVELOPMENT</Text>
        </Tabs.Tab>

        <Tabs.Tab value="operations" icon={<IconSettings size="0.8rem" />}>
          <Text size="sm"> OPERATIONS</Text>
        </Tabs.Tab>

        <Tabs.Tab
          value="marketingSales"
          icon={<IconReportAnalytics size="0.8rem" />}
        >
          <Text size="sm">MARKETING / SALES</Text>
        </Tabs.Tab>

        <Tabs.Tab value="hr" icon={<IconBrandSuperhuman size="0.8rem" />}>
          <Text size="sm">HUMAN RESOURCES</Text>
        </Tabs.Tab>

        <Tabs.Tab value="finance" icon={<IconBusinessplan size="0.8rem" />}>
          <Text size="sm">FINANCE / ACCOUNTING</Text>
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};

export default NavbarComponent;
