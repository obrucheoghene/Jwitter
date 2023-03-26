interface SidebarItemProps {
  href: String;
  label: String;
  icon: React.ReactNode;
}
const SidebarItem: React.FC<SidebarItemProps> = ({ href, label, icon }) => {
  return <div>SidebarItem</div>;
};

export default SidebarItem;
