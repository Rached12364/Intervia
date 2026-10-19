Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\rache\intervia\src\assets\livre\storyboard_mohamed_3x3.jpg"
$bmp = New-Object System.Drawing.Bitmap($srcPath)

# 3 columns (inner artwork without outer border or gutter):
# Col 1: x from 28 to 415 -> border is at 28..29 and 414..415 -> artwork is approx 31 to 412 (width 382)
# Col 2: x from 438 to 825 -> border is at 438..439 and 824..825 -> artwork is approx 441 to 822 (width 382)
# Col 3: x from 848 to 1235 -> border is at 848..849 and 1234..1235 -> artwork is approx 851 to 1232 (width 382)

# Row 1 artwork (above caption box):
# Border top is around y=27..28.
# Caption box starts at y=252 and ends at y=286.
# So artwork 1 is y from 30 to 247! (height 218)

# Row 2 artwork:
# Border top is at y=302..303.
# Caption box starts at y=528 and ends at y=562.
# Artwork 2 is y from 305 to 523! (height 219)

# Row 3 artwork:
# Border top is at y=577..578.
# Caption box starts at y=802 and ends at y=836.
# Artwork 3 is y from 580 to 797! (height 218)

$cols = @(
    @{ name = "c1"; x = 31; w = 382 },
    @{ name = "c2"; x = 441; w = 382 },
    @{ name = "c3"; x = 851; w = 382 }
)

$rows = @(
    @{ name = "r1"; y = 30; h = 217 },
    @{ name = "r2"; y = 305; h = 218 },
    @{ name = "r3"; y = 580; h = 217 }
)

$destDir = "c:\Users\rache\intervia\src\assets\livre"
$index = 1

$encoder = [System.Drawing.Imaging.ImageFormat]::Jpeg

foreach ($r in $rows) {
    foreach ($c in $cols) {
        $rect = New-Object System.Drawing.Rectangle($c.x, $r.y, $c.w, $r.h)
        $cropped = New-Object System.Drawing.Bitmap($c.w, $r.h)
        $g = [System.Drawing.Graphics]::FromImage($cropped)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        
        $destRect = New-Object System.Drawing.Rectangle(0, 0, $c.w, $r.h)
        $g.DrawImage($bmp, $destRect, $rect, [System.Drawing.GraphicsUnit]::Pixel)
        $g.Dispose()

        $outPath = Join-Path $destDir "case-$index.jpg"
        $cropped.Save($outPath, $encoder)
        $cropped.Dispose()

        $fi = Get-Item $outPath
        Write-Output "Saved case-$index.jpg: $($c.w)x$($r.h) ($($fi.Length) bytes)"
        $index++
    }
}

# Crop tight on Mohamed's face in panel 4 (case-4.jpg):
# In panel 4 (Col 1, Row 2: x=31, y=305), Mohamed is on the left sitting at the desk.
# Let's inspect or crop his face area:
# In case-4.jpg (382x218), Mohamed's head is around x=30..130, y=10..130.
# Let's crop a square portrait (approx 120x130 or 140x140) for polaroid
$case4Bmp = New-Object System.Drawing.Bitmap((Join-Path $destDir "case-4.jpg"))
# Mohamed is looking towards the right, head is in the upper-left/center quadrant:
# Let's crop x=40, y=10, w=110, h=120
$faceRect = New-Object System.Drawing.Rectangle(35, 10, 115, 125)
$faceBmp = New-Object System.Drawing.Bitmap(115, 125)
$gFace = [System.Drawing.Graphics]::FromImage($faceBmp)
$gFace.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gFace.DrawImage($case4Bmp, (New-Object System.Drawing.Rectangle(0, 0, 115, 125)), $faceRect, [System.Drawing.GraphicsUnit]::Pixel)
$gFace.Dispose()
$faceOut = Join-Path $destDir "regard-mohamed-case4.jpg"
$faceBmp.Save($faceOut, $encoder)
$faceBmp.Dispose()
$case4Bmp.Dispose()
Write-Output "Saved regard-mohamed-case4.jpg"

$bmp.Dispose()
