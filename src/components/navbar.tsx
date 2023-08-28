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
        <div className="p-3" style={{ display: "flex" }}>
          <IconCubeSend size="0.8rem" />
          <div>
            <Menu
              trigger="hover"
              openDelay={100}
              closeDelay={400}
              shadow="md"
              width={200}
            >
              <Menu.Target>
                <Text size="sm">PRODUCT DEVELOPMENT</Text>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => onTabChange("conceptRecipe")}>
                  Concept Recipes
                </Menu.Item>
                <Menu.Item onClick={() => onTabChange("testRecipe")}>
                  Test Recipes
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
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
