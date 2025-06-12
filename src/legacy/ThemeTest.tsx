const colorGroups = [
  {
    name: 'Carbon',
    prefix: 'carbon',
    labels: ['1', '2', '3', '4'],
    // left to right: lightest to darkest
    classes: ['bg-carbon-1', 'bg-carbon-2', 'bg-carbon-3', 'bg-carbon-4'],
    text: 'text-carbon-4',
    font: 'font-xenon',
  },
  {
    name: 'Silicon',
    prefix: 'silicon',
    labels: ['1', '2', '3'],
    // left to right: lightest to darkest
    classes: ['bg-silicon-1', 'bg-silicon-2', 'bg-silicon-3'],
    text: 'text-carbon-4',
    font: 'font-argon',
  },
  {
    name: 'Oxygen',
    prefix: 'oxygen',
    labels: ['1', '2', '3'],
    // top right: lightest to darkest
    classes: ['bg-oxygen-1', 'bg-oxygen-2', 'bg-oxygen-3'],
    text: 'text-carbon-1',
    font: 'font-neon',
  },
  {
    name: 'Nitrogen',
    prefix: 'nitrogen',
    labels: ['3', '2', '1'], // order: vivid, medium, pale (matches your palette)
    // left to right: most saturated to lightest
    classes: ['bg-nitrogen-3', 'bg-nitrogen-2', 'bg-nitrogen-1'],
    text: 'text-carbon-4',
    font: 'font-radon',
  },
];

export default function ThemeTest() {
  return (
    <div className="min-h-screen p-8 grid grid-cols-2 gap-8 bg-carbon-1">
      {/* Top Left: Carbon */}
      <div>
        <h2 className="mb-4 font-xenon text-lg text-carbon-4">Carbon (gray)</h2>
        <div className="flex gap-4 items-end">
          {colorGroups[0].classes.map((cls, i) => (
            <div
              key={cls}
              className={`${cls} ${colorGroups[0].font} w-20 h-28 flex items-end justify-center rounded shadow`}
              style={{ zIndex: 4 - i, marginLeft: i ? -24 : 0 }}
            >
              <span className="mb-2 text-xs text-carbon-4">
                #{colorGroups[0].labels[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Right: Oxygen */}
      <div>
        <h2 className="mb-4 font-neon text-lg text-carbon-4">
          Oxygen (red/orange/pink)
        </h2>
        <div className="flex flex-col-reverse items-end gap-[-24px]">
          {colorGroups[2].classes.map((cls, i) => (
            <div
              key={cls}
              className={`${cls} ${colorGroups[2].font} w-28 h-24 flex items-start justify-end rounded shadow`}
              style={{ marginTop: i ? -24 : 0, zIndex: 3 - i }}
            >
              <span className="mt-2 mr-2 text-xs text-carbon-4">
                #{colorGroups[2].labels[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Left: Silicon */}
      <div>
        <h2 className="mb-4 font-argon text-lg text-carbon-4">
          Silicon (yellow/gold)
        </h2>
        <div className="flex gap-4 items-end">
          {colorGroups[1].classes.map((cls, i) => (
            <div
              key={cls}
              className={`${cls} ${colorGroups[1].font} w-28 h-32 flex items-end justify-center rounded shadow`}
              style={{ zIndex: 3 - i, marginLeft: i ? -24 : 0 }}
            >
              <span className="mb-2 text-xs text-carbon-4">
                #{colorGroups[1].labels[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Right: Nitrogen */}
      <div>
        <h2 className="mb-4 font-radon text-lg text-carbon-4">
          Nitrogen (blue)
        </h2>
        <div className="flex gap-4 items-end">
          {colorGroups[3].classes.map((cls, i) => (
            <div
              key={cls}
              className={`${cls} ${colorGroups[3].font} w-24 h-20 flex items-end justify-center rounded shadow`}
              style={{ zIndex: 3 - i, marginLeft: i ? -24 : 0 }}
            >
              <span className="mb-2 text-xs text-carbon-4">
                #{colorGroups[3].labels[i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
