export interface CuentaMetric {
  readonly id: string;
  readonly valor: string;
  readonly label: string;
  readonly color: string;
  readonly textColor: string;
  readonly priority: 'low' | 'medium' | 'high';
  readonly trend?: {
    value: number;
    isPositive: boolean;
  };
}

export interface InstagramPost {
  readonly id: string;
  readonly imageUrl: string;
  readonly caption: string;
  readonly likes: number;
  readonly comments: number;
  readonly date: Date;
  readonly engagement: number;
}

export interface CuentaSectionProps {
  readonly username?: string;
  readonly posts?: readonly InstagramPost[];
}

export interface ProfileStatsChartData {
  readonly categories: readonly string[];
  readonly series: readonly {
    name: string;
    data: readonly number[];
  }[];
}
