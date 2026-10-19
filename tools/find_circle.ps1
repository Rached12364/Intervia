Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\rache\intervia\src\assets\livre\case-6.jpg"
$bmp = New-Object System.Drawing.Bitmap($srcPath)

Write-Output "Case 6 dimensions: $($bmp.Width) x $($bmp.Height)"

# The circle is located in the left half of case-6
# Let's find white pixels around x=100..200, y=50..150
$circlePixels = @()
for ($y = 40; $y -lt 160; $y++) {
    for ($x = 70; $x -lt 220; $x++) {
        $c = $bmp.GetPixel($x, $y)
        # The white outline of the circle has high brightness and R,G,B > 220
        if ($c.R -gt 210 -and $c.G -gt 210 -and $c.B -gt 210) {
            $circlePixels += [PSCustomObject]@{ x = $x; y = $y }
        }
    }
}

if ($circlePixels.Count -gt 0) {
    $minX = ($circlePixels | Measure-Object -Property x -Minimum).Minimum
    $maxX = ($circlePixels | Measure-Object -Property x -Maximum).Maximum
    $minY = ($circlePixels | Measure-Object -Property y -Minimum).Minimum
    $maxY = ($circlePixels | Measure-Object -Property y -Maximum).Maximum

    $centerX = ($minX + $maxX) / 2
    $centerY = ($minY + $maxY) / 2
    $diameter = ($maxX - $minX)

    Write-Output "Detected circle bounds: X=[$minX, $maxX], Y=[$minY, $maxY]"
    Write-Output "Center: ($centerX, $centerY), Diameter: $diameter"
} else {
    Write-Output "No white circle pixels found with threshold 210"
}

$bmp.Dispose()
