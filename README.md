# SE3010-Project1
## App Design Sketch
![App Design Sketch](/App%20sketch.jpg)

## Packages Used
1. **Tabs**
2. **Haptics**

## HIG and Material Design Implementation
In both HIGS and Material Design, they say the hitbox size of buttons should about 44-48px. I imeplemented this with my star icon buttons used for favorites, in which I increased their hitbox size to 48px (the icon itself is 26px with 4px padding and a hitslop of 7). I also implemented this with the camera button found in the park info pages and the custom button components used for theme selection.
(https://developer.apple.com/design/human-interface-guidelines/buttons)

Material Design also says that when tapping on list rows with multi actions, the primary action (such as navigation) should take most of the space. I preiously had navigation only occur upon tapping an arrow button on the right side of each list row, but I changed it to the whole list row is tappable and replaced the arrow icon button with the favorites button.
(https://m3.material.io/components/lists/guidelines)

Both HIGS says you shouldn't only rely on color to emphasise something, there should be alternative ways of selection indication. I implemented this in my change themes page, where each button used to change the color is completely filled in with a check mark icon on the left of the button that correlates to the currently selected theme.
(https://developer.apple.com/design/human-interface-guidelines/color)

