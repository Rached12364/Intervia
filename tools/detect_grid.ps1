Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\rache\intervia\src\assets\livre\storyboard_mohamed_3x3.jpg"
$bmp = New-Object System.Drawing.Bitmap($srcPath)

# Sample horizontal lines across middle y=200 to find gutters and borders
$row = 200
$line = ""
for ($x = 0; $x -lt $bmp.Width; $x += 4) {
    $c = $bmp.GetPixel($x, $row)
    $brightness = [int]($c.GetBrightness() * 100)
    # output if dark (border) or cream
    if ($c.R -gt 220 -and $c.G -gt 220 -and $c.B -gt 210) {
        # Cream gutter
    }
}

# Scan along x at y=200 to find column boundaries
Write-Output "--- Scanning horizontal boundaries at y=150 ---"
$prevColor = ""
for ($x = 0; $x -lt $bmp.Width; $x++) {
    $c = $bmp.GetPixel($x, 150)
    # Check if pure black border (R < 50, G < 50, B < 50)
    $isBlack = ($c.R -lt 60 -and $c.G -lt 60 -and $c.B -lt 60)
    $isCream = ($c.R -gt 220 -and $c.G -gt 210 -and $c.B -gt 195)
    if ($isBlack) {
        Write-Output "Black at x=$x"
    }
}

# Scan along y at x=200 to find row boundaries
Write-Output "--- Scanning vertical boundaries at x=200 ---"
for ($y = 0; $y -lt $bmp.Height; $y++) {
    $c = $bmp.GetPixel(200, $y)
    $isBlack = ($c.R -lt 60 -and $c.G -lt 60 -and $c.B -lt 60)
    if ($isBlack) {
        Write-Output "Black at y=$y"
    }
}

$bmp.Dispose()
