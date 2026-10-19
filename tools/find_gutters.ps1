Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\rache\intervia\src\assets\livre\storyboard_mohamed_3x3.jpg"
$bmp = New-Object System.Drawing.Bitmap($srcPath)

# We want to find the 3 panel boxes and their inner image areas (excluding caption boxes and outer frames)
# Let's inspect vertical lines at x = 200, 600, 1000
# And horizontal lines at y = 150, 420, 680

# Panel 1:
# Let's check pixel colors along top edge x=50..400 at y=25..35
Write-Output "Image size: $($bmp.Width) x $($bmp.Height)"

# Find horizontal gutters (cream rows spanning the entire width)
$creamRows = @()
for ($y = 0; $y -lt $bmp.Height; $y++) {
    $allCream = $true
    for ($x = 0; $x -lt $bmp.Width; $x += 10) {
        $c = $bmp.GetPixel($x, $y)
        # Cream: R > 200, G > 190, B > 170 and not pure white/grey
        if ($c.R -lt 210 -or $c.G -lt 200 -or $c.B -lt 185) {
            $allCream = $false
            break
        }
    }
    if ($allCream) {
        $creamRows += $y
    }
}
Write-Output "Cream rows count: $($creamRows.Count)"
if ($creamRows.Count -gt 0) {
    Write-Output "Cream rows: $($creamRows -join ', ')"
}

# Find cream columns
$creamCols = @()
for ($x = 0; $x -lt $bmp.Width; $x++) {
    $allCream = $true
    for ($y = 0; $y -lt $bmp.Height; $y += 10) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -lt 210 -or $c.G -lt 200 -or $c.B -lt 185) {
            $allCream = $false
            break
        }
    }
    if ($allCream) {
        $creamCols += $x
    }
}
Write-Output "Cream cols count: $($creamCols.Count)"
if ($creamCols.Count -gt 0) {
    Write-Output "Cream cols: $($creamCols -join ', ')"
}

$bmp.Dispose()
