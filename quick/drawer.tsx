import { Drawer } from 'vaul';

export default function VaulDrawer() {
  return (
    <Drawer.Root direction="left">
      <Drawer.Trigger className="relative h-8 px-1.5 text-sm font-medium text-carbon-1 bg-oxygen-3 hover:bg-oxygen-2 cursor-pointer">
        Open Drawer
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-carbon-4/40" />
        <Drawer.Content className="bg-carbon-4 w-1/3 fixed bottom-0 top-0 left-0 outline-none">
          <div className="p-4 bg-carbon-1">Drawer</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
